import { useForm } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import { auth } from '../firebase'

const ChangePasswordForm = () => {
  const { register, handleSubmit, errors, getValues } = useForm();

  const submit = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    // Firebase Authenticationを使用してユーザーを取得
    const user = auth.currentUser;

    // Firebaseにログインしている場合、現在のパスワードを検証
    try {
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);

      // 新しいパスワードが確認用と一致するか確認
      if (newPassword !== confirmNewPassword) {
        alert('新しいパスワードが一致しません');
        return;
      }

      // パスワードの強度を確認
      const passwordRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+])(?=.*[a-zA-Z0-9!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        alert('新しいパスワードは半角英数字と特殊文字を含み、8文字以上である必要があります');
        return;
      }

      // Firebase Authenticationでパスワード更新
      await user.updatePassword(newPassword);
      alert('パスワードが正常に変更されました');
    } catch (error) {
      alert('現在のパスワードが正しくありません');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Box>
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          label="現在のパスワード"
          type="password"
          name="currentPassword"
          inputRef={register({ required: true })}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword && '現在のパスワードを入力してください'}
        />
      </Box>
      <Box>
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          label="新しいパスワード"
          type="password"
          name="newPassword"
          inputRef={register({ required: true })}
          error={!!errors.newPassword}
          helperText={errors.newPassword && '新しいパスワードを入力してください'}
        />
      </Box>
      <Box>
        <TextField
          sx={{'.MuiOutlinedInput-root': { borderRadius: '18px' }}}
          label="新しいパスワード（再入力）"
          type="password"
          name="confirmNewPassword"
          inputRef={register({
            required: true,
            validate: (value) => value === getValues('newPassword'),
          })}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword && 'パスワードが一致しません'}
        />
      </Box>
      <Box>
        <Button type="submit" variant="contained" color="primary">
          パスワード変更
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
